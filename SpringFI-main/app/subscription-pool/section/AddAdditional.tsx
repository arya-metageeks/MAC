"use client";
import React, { useState, useEffect, useContext } from "react";
import { useFormContext } from "@/context/FormContext";
import CustomInput from "@/components/InputComponents/CustomInput";

type AddAdditionalProps = {
  onStepValidation: (isValid: boolean) => void;
};

const AddAdditional: React.FC<AddAdditionalProps> = ({ onStepValidation }) => {
  const [isValidLogoUrl, setIsValidLogoUrl] = useState(false);
  const [isValidBgLogoUrl, setIsValidBgLogoUrl] = useState(false);

  const [isValidWebsiteUrl, setIsValidWebsiteUrl] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);
  const {
    setLogoUrl,
    setBgLogoUrl,
    setWebsiteUrl,
    setDescription,
    setFacebook,
    setTwitter,
    setGithub,
    setTelegram,
    setInstagram,
    setDiscord,
    setReddit,
    setYoutube,
    logoUrl,
    bgLogoUrl,
    websiteUrl,
    description,
  } = useFormContext();
  const handleLogoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(event.target.value);
    setIsValidLogoUrl(false);
  };

  const handleBgLogoUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBgLogoUrl(event.target.value);
    setIsValidBgLogoUrl(false);
  };

  const handleWebsiteUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWebsiteUrl(event.target.value);
    setIsValidWebsiteUrl(false);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    setIsValidDescription(false);
  };

  const handleFacebookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFacebook(event.target.value);
  };
  const handleTwitterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwitter(event.target.value);
  };
  const handleGithubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithub(event.target.value);
  };

  const handleTelegramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelegram(event.target.value);
  };

  const handleInstagramChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstagram(event.target.value);
  };

  const handleDiscordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscord(event.target.value);
  };

  const handleRedditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReddit(event.target.value);
  };

  const handleYoutubeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutube(event.target.value);
  };

  const checkLogoUrlValidity = () => {
    if (logoUrl.trim() === "") {
      setIsValidLogoUrl(false);
      return;
    }

    // You can use any regex or logic to validate the logo url format
    const isLogoUrlFormatValid = /^https?:\/\/.+\/.+.(png|jpg|jpeg|svg)$/i.test(
      logoUrl
    );

    setIsValidLogoUrl(isLogoUrlFormatValid);
  };

  const checkWebsiteUrlValidity = () => {
    if (websiteUrl.trim() === "") {
      setIsValidWebsiteUrl(false);
      return;
    }

    const isWebsiteUrlFormatValid = /^https?:\/\/.+$/i.test(websiteUrl);

    setIsValidWebsiteUrl(isWebsiteUrlFormatValid);
  };
  const checkDescriptionValidity = () => {
    // Check if the description contains a valid URL (http or https)
    const isDescriptionFormatValid = /^.*/i.test(description);

    setIsValidDescription(isDescriptionFormatValid);
  };

  const isFormValid = (): boolean => {
    return isValidLogoUrl && isValidDescription && isValidWebsiteUrl;
  };

  useEffect(() => {
    onStepValidation(isFormValid());
  }, [isValidLogoUrl, isValidWebsiteUrl, onStepValidation]);

  return (
    <div>
      <div className="mb-4">
        <CustomInput
          labelElement="Description"
          id="description"
          name="description"
          placeholder="Your description"
          type="text"
          className=""
          value={description}
          onChange={handleDescriptionChange}
          onBlur={checkDescriptionValidity}
          required
        />
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Logo URl"
          id="logoUrl"
          name="logoUrl"
          placeholder="Ex: https://logo.png"
          type="text"
          className=""
          value={logoUrl}
          onChange={handleLogoUrlChange}
          onBlur={checkLogoUrlValidity}
          required
        />
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Background Image URL"
          id="bgLogoUrl"
          name="bgLogoUrl"
          placeholder="Ex: https://bg-logo.png"
          type="text"
          className=""
          value={bgLogoUrl}
          onChange={handleBgLogoUrlChange}
          onBlur={checkLogoUrlValidity}
          required
        />
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Website"
          id="websiteUrl"
          name="websiteUrl"
          placeholder="Ex: https://.."
          type="text"
          className=""
          value={websiteUrl}
          onChange={handleWebsiteUrlChange}
          onBlur={checkWebsiteUrlValidity}
          required
        />
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Facebook"
          id="facebook"
          name="facebook"
          placeholder="Ex:https://Facebook.com/.."
          type="text"
          className=""
          onChange={handleFacebookChange}
        />
      </div>
      <div className="mb-4">
        <CustomInput
          labelElement="Twitter"
          id="twitter"
          name="twitter"
          placeholder="Ex:https://twitter.com/.."
          type="text"
          className=""
          onChange={handleTwitterChange}
        />
      </div>

      <div className="mb-4">
        <CustomInput
          labelElement="Github"
          id="github"
          name="github"
          placeholder="Ex:https://github.com/.."
          type="text"
          className=""
          onChange={handleGithubChange}
        />
      </div>

      <div className="mb-4">
        <CustomInput
          labelElement="Telegram"
          id="telegram"
          name="telegram"
          placeholder="Ex:https://telegram.com/.."
          type="text"
          className=""
          onChange={handleTelegramChange}
        />
      </div>

      <div className="mb-4">
        <CustomInput
          labelElement="Instagram"
          id="instagram"
          name="instagram"
          placeholder="Ex:https://instagram.com/.."
          type="text"
          className=""
          onChange={handleInstagramChange}
        />
      </div>

      <div className="mb-4">
        <CustomInput
          labelElement="Discord"
          id="discord"
          name="discord"
          placeholder="Ex:https://discord.com/.."
          type="text"
          className=""
          onChange={handleDiscordChange}
        />
      </div>

      <div className="mb-4">
        <CustomInput
          labelElement="Reddit"
          id="reddit"
          name="reddit"
          placeholder="Ex:https://reddit.com/.."
          type="text"
          className=""
          onChange={handleRedditChange}
        />
      </div>

      <div className="mb-4">
        <CustomInput
          labelElement="Youtube"
          id="youtube"
          name="youtube"
          placeholder="Ex:https://youtube.com/.."
          type="text"
          className=""
          onChange={handleYoutubeChange}
        />
      </div>
    </div>
  );
};

export default AddAdditional;
