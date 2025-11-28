
-- Таблица сервисов
DROP TABLE IF EXISTS "tbService";
CREATE TABLE "tbService" (
    "pkIdService" SERIAL PRIMARY KEY,
    "name" VARCHAR(128) NOT NULL
);

-- Таблица статусов
DROP TABLE IF EXISTS "tbStatus";
CREATE TABLE "tbStatus" (
    "pkIdStatus" SERIAL PRIMARY KEY,
    "name" VARCHAR(128) NOT NULL
);

-- Таблица заказов
DROP TABLE IF EXISTS "tbOrder";
CREATE TABLE "tbOrder" (
    "pkIdOrder" VARCHAR(256) PRIMARY KEY,
    "firstName" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(32) NOT NULL CHECK (char_length("phone") BETWEEN 9 AND 32),
    "location" VARCHAR(256) NOT NULL,
    "dateOfCreation" TIMESTAMP NOT NULL DEFAULT NOW(),
    "comment" VARCHAR(1024),
    "fkIdService" INT DEFAULT 7,
    "fkIdStatus" INT DEFAULT 1,
    CONSTRAINT "se_fk" FOREIGN KEY ("fkIdService") REFERENCES "tbService"("pkIdService") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "st_fk" FOREIGN KEY ("fkIdStatus") REFERENCES "tbStatus"("pkIdStatus") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Индексы
CREATE INDEX "ind_tbOrder_firstName" ON "tbOrder"("firstName");
CREATE INDEX "ind_tbOrder_fkIdService" ON "tbOrder"("fkIdService");
CREATE INDEX "ind_tbOrder_fkIdStatus" ON "tbOrder"("fkIdStatus");

-- Таблица админов
DROP TABLE IF EXISTS "tbAdmin";
CREATE TABLE "tbAdmin" (
    "pkIdAdmin" SERIAL PRIMARY KEY,
    "login" VARCHAR(256) NOT NULL,
    "passwordHash" VARCHAR(528) NOT NULL
);

-- Таблица удалённых заказов
DROP TABLE IF EXISTS "tbDeletedOrders";
CREATE TABLE "tbDeletedOrders" (
    "pkIdDeleteOrder" SERIAL PRIMARY KEY,
    "pkIdOrder" VARCHAR(256) NOT NULL,
    "firstName" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(64) NOT NULL,
    "location" VARCHAR(256) NOT NULL,
    "comment" VARCHAR(1024),
    "fkIdService" INT,
    "fkIdStatus" INT,
    "deletedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "reason" VARCHAR(1024)
);

-- Триггер для сохранения удалённых заказов
CREATE OR REPLACE FUNCTION trg_delete_order()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "tbDeletedOrders"("pkIdOrder","firstName","phone","location","comment","fkIdService","fkIdStatus","reason")
    SELECT OLD."pkIdOrder", OLD."firstName", OLD."phone", OLD."location", OLD."comment", OLD."fkIdService", OLD."fkIdStatus", 'Заявка обработана/устарела';
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "trg_DeleteOrder_SaveOrderInTbDeletedOrders"
AFTER DELETE ON "tbOrder"
FOR EACH ROW EXECUTE FUNCTION trg_delete_order();

-- Начальные данные
INSERT INTO "tbStatus"("name") VALUES ('Активно'), ('Закрыто');
INSERT INTO "tbService"("name") VALUES 
('Укладка плитки'), ('Рулонный/посевной газон'), ('Грунтовая дорога'),
('Забор'), ('Фундамент'), ('Водоотвод'), ('Комплексные работы');

INSERT INTO "tbAdmin"("login","passwordHash") VALUES 
('admin', '$2b$10$5./Sni1NL3pSSAbqXCGj1O7PTc.Suz6TjBk0A2Vduq7W7.BvfxjE2');

INSERT INTO "tbOrder"("pkIdOrder","firstName","phone","location","fkIdService","fkIdStatus") VALUES
('7181f5cf-e3e9-42e2-8532-aeb643b69730','Захар','+375447281124','СТ Птичь-2, 20',2,1),
('423b4399-5228-49b5-9ac2-d54fabd21e2a','Евлампий','+375449281144','СТ Птичь-1, 22',3,2);



CREATE OR REPLACE FUNCTION pr_FilterOrders(
    status VARCHAR DEFAULT NULL,
    startDate TIMESTAMP  DEFAULT NULL,
    endDate TIMESTAMP  DEFAULT NULL,
    searchText VARCHAR DEFAULT NULL
)
RETURNS TABLE(
    "pkIdOrder" VARCHAR,
    "firstName" VARCHAR,
    "phone" VARCHAR,
    "location" VARCHAR,
    "comment" VARCHAR,
    "dateOfCreation" TIMESTAMP ,
    "serviceName" VARCHAR,
    "statusName" VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        o."pkIdOrder" AS "pkIdOrder",
        o."firstName" AS "firstName",
        o."phone" AS "phone",
        o."location" AS "location",
        o."comment" AS "comment",
        o."dateOfCreation" AS "dateOfCreation",
        s."name" AS "serviceName",
        st."name" AS "statusName"
    FROM "tbOrder" o
    JOIN "tbService" s ON o."fkIdService" = s."pkIdService"
    JOIN "tbStatus" st ON o."fkIdStatus" = st."pkIdStatus"
    WHERE (status IS NULL OR st."name" = status)
      AND (startDate IS NULL OR o."dateOfCreation" >= startDate)
      AND (endDate IS NULL OR o."dateOfCreation" <= endDate)
      AND (searchText IS NULL OR
           o."firstName" ILIKE '%' || searchText || '%' OR
           o."phone" ILIKE '%' || searchText || '%' OR
           o."location" ILIKE '%' || searchText || '%' OR
           o."comment" ILIKE '%' || searchText || '%' OR
           s."name" ILIKE '%' || searchText || '%' OR
           st."name" ILIKE '%' || searchText || '%')
	ORDER BY o."dateOfCreation" DESC;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION pr_GetOrderById(_pkIdOrder VARCHAR)
RETURNS TABLE (
    "pkIdOrder" VARCHAR,
    "firstName" VARCHAR,
    "phone" VARCHAR,
    "location" VARCHAR,
    "comment" VARCHAR,
    "dateOfCreation" TIMESTAMP,
    "serviceName" VARCHAR,
    "statusName" VARCHAR,
    "fkIdService" INT,
    "fkIdStatus" INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        o."pkIdOrder" AS "pkIdOrder",
        o."firstName" AS "firstName",
        o."phone" AS "phone",
        o."location" AS "location",
        o."comment" AS "comment",
        o."dateOfCreation" AS "dateOfCreation",
        s."name" AS "serviceName",
        st."name" AS "statusName",
        o."fkIdService" AS "fkIdService",
        o."fkIdStatus" AS "fkIdStatus"
    FROM "tbOrder" o
    JOIN "tbService" s ON o."fkIdService" = s."pkIdService"
    JOIN "tbStatus" st ON o."fkIdStatus" = st."pkIdStatus"
    WHERE o."pkIdOrder" = _pkIdOrder;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION pr_GetAdminByLogin(_login VARCHAR)
RETURNS TABLE (
    "pkIdAdmin" INT,
    "login" VARCHAR,
    "passwordHash" VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        a."pkIdAdmin" AS "pkIdAdmin",
        a."login" AS "login",
        a."passwordHash" AS "passwordHash"
    FROM "tbAdmin" a
    WHERE a."login" = _login;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION pr_InsertOrder(
    _pkIdOrder VARCHAR,
    _firstName VARCHAR,
    _phone VARCHAR,
    _location VARCHAR,
    _fkIdService INT DEFAULT 7,
    _fkIdStatus INT DEFAULT 1
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO "tbOrder"("pkIdOrder","firstName","phone","location","fkIdService","fkIdStatus")
    VALUES (_pkIdOrder, _firstName, _phone, _location, _fkIdService, _fkIdStatus);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION pr_CreateAdmin(
    _login VARCHAR,
    _passwordHash VARCHAR
)
RETURNS TABLE (
    "pkIdAdmin" INT,
    "login" VARCHAR,
    "passwordHash" VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO "tbAdmin"("login","passwordHash")
    VALUES (_login, _passwordHash)
    RETURNING
        "pkIdAdmin" AS "pkIdAdmin",
        "login" AS "login",
        "passwordHash" AS "passwordHash";
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION pr_UpdateOrder(
    _pkIdOrder VARCHAR,
    _newFirstName VARCHAR DEFAULT NULL,
    _newPhone VARCHAR DEFAULT NULL,
    _newLocation VARCHAR DEFAULT NULL,
    _newComment VARCHAR DEFAULT NULL,
    _newFkIdService INT DEFAULT NULL,
    _newFkIdStatus INT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE "tbOrder"
    SET "firstName" = COALESCE(_newFirstName, "firstName"),
        "phone" = COALESCE(_newPhone, "phone"),
        "location" = COALESCE(_newLocation, "location"),
        "comment" = COALESCE(_newComment, "comment"),
        "fkIdService" = COALESCE(_newFkIdService, "fkIdService"),
        "fkIdStatus" = COALESCE(_newFkIdStatus, "fkIdStatus")
    WHERE "pkIdOrder" = _pkIdOrder;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION pr_DeleteOrder(_pkIdOrder VARCHAR)
RETURNS VOID AS $$
BEGIN
    DELETE FROM "tbOrder" WHERE "pkIdOrder" = _pkIdOrder;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM pr_FilterOrders();
SELECT * FROM pr_GetOrderById('7181f5cf-e3e9-42e2-8532-aeb643b69730');
SELECT * FROM pr_GetAdminByLogin('admin');
SELECT pr_InsertOrder('5c711f3d-fb2b-4f8c-9d7f-ed7cb50cbb2a','Артур','+375253378844','деревушка, 20',2,1);
SELECT pr_UpdateOrder('5c711f3d-fb2b-4f8c-9d7f-ed7cb50cbb2a', _newLocation=>'Минск, ул. Ленина');
SELECT pr_DeleteOrder('5c711f3d-fb2b-4f8c-9d7f-ed7cb50cbb2a');

SELECT pr_InsertOrder('5c711f3d-fb2b-4f8c-9d7f-ed7cb50cbb2a', 'Артур', '+375253378844', 'деревушка, 20', 2, 1);
SELECT pr_InsertOrder('a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8', 'Иван', '+375291234567', 'Минск, ул. Ленина, 10', 3, 2);
SELECT pr_InsertOrder('b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9', 'Пётр', '+375339876543', 'СТ Птичь-2, дом 45', 1, 1);
SELECT pr_InsertOrder('c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0', 'Александр', '+375441112233', 'д. Колодищи, 5', 5, 2);
SELECT pr_InsertOrder('d4e5f6g7-h8i9-0123-j4k5-l6m7n8o9p0q1', 'Дмитрий', '+375257778899', 'пос. Лесной, 18', 7, 1);
SELECT pr_InsertOrder('e5f6g7h8-i9j0-1234-k5l6-m7n8o9p0q1r2', 'Алексей', '+375296667788', 'Минск, пр-т Независимости, 50', 4, 2);
SELECT pr_InsertOrder('f6g7h8i9-j0k1-2345-l6m7-n8o9p0q1r2s3', 'Сергей', '+375442233445', 'Гомель, ул. Советская, 15', 6, 1);
SELECT pr_InsertOrder('g7h8i9j0-k1l2-3456-m7n8-o9p0q1r2s3t4', 'Андрей', '+375335556677', 'Брест, ул. Московская, 30', 2, 2);
SELECT pr_InsertOrder('h8i9j0k1-l2m3-4567-n8o9-p0q1r2s3t4u5', 'Михаил', '+375254445566', 'Гродно, ул. Горького, 7', 3, 1);
SELECT pr_InsertOrder('i9j0k1l2-m3n4-5678-o9p0-q1r2s3t4u5v6', 'Николай', '+375443334455', 'Витебск, ул. Кирова, 12', 1, 2);
SELECT pr_InsertOrder('j0k1l2m3-n4o5-6789-p0q1-r2s3t4u5v6w7', 'Евгений', '+375298889900', 'Могилёв, ул. Первомайская, 8', 7, 1);
SELECT pr_InsertOrder('k1l2m3n4-o5p6-7890-q1r2-s3t4u5v6w7x8', 'Владимир', '+375337778899', 'СТ Птичь-1, дом 20', 4, 2);
SELECT pr_InsertOrder('l2m3n4o5-p6q7-8901-r2s3-t4u5v6w7x8y9', 'Олег', '+375251112233', 'д. Саковичи, 12', 5, 1);
SELECT pr_InsertOrder('m3n4o5p6-q7r8-9012-s3t4-u5v6w7x8y9z0', 'Максим', '+375449998877', 'д. Колодищи, 5', 6, 2);
SELECT pr_InsertOrder('n4o5p6q7-r8s9-0123-t4u5-v6w7x8y9z0a1', 'Артём', '+375293334455', 'пос. Лесной, 18', 3, 1);
