import { useEffect } from "react";
import ApplicationForm from "../../forms/ApplicationForm/ApplicationForm";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import MessageAfterAppForm from "../../forms/MessageAfterAppForm/MessageAfterAppForm";
import { useApplicationForm } from "../../hooks/useApplicationForm";

export const ClientPage = () => {
  const {
    data,
    errors,
    appFormIsVisible,
    messageIsVisible,
    isLoading,
    apiError,
    setAppFormIsVisible,
    setMessageIsVisible,
    handleInputChange,
    handleSubmit,
  } = useApplicationForm();

  useEffect(() => {
    if (appFormIsVisible || messageIsVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [appFormIsVisible, messageIsVisible]);

  return (
    <>
      {appFormIsVisible && (
        <ApplicationForm
          handleInputChange={handleInputChange}
          data={data}
          errors={errors}
          handleSubmit={handleSubmit}
          onClick={() => setAppFormIsVisible(false)}
          isLoading={isLoading}
        />
      )}
      {messageIsVisible && (
        <MessageAfterAppForm onClick={() => setMessageIsVisible(false)} />
      )}
      <Header onClick={() => setAppFormIsVisible(true)} />
      <Main />
      <Footer />
    </>
  );
};
