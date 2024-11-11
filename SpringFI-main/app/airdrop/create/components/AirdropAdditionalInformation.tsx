"use client";
import React, { useState, useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import CustomInput from "@/components/InputComponents/CustomInput";

const BgInput = ({ children }: any) => {
  return <>{children}</>;
};
type AirdropAdditionalInformationProps = {
  onStepValidation: (isValid: boolean) => void;
};

const AirdropAdditionalInformation: React.FC<
  AirdropAdditionalInformationProps
> = ({ onStepValidation }) => {
  const [airDropTitle, setAirDropTitle] = useState(false);
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
    setAirdrop,
    logoUrl,
    bgLogoUrl,
    websiteUrl,
    description,
    airDrop,
    facebook,
    twitter,
    github,
    telegram,
    instagram,
    discord,
    reddit,

    youtube,
  } = useFormContext();

  const handleAirDropTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAirdrop(event.target.value);
    setAirDropTitle(false);
  };

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

  const checkAirDropTitleValidity = () => {
    // You can use any regex or logic to validate the logo url format
    const isAirDropTitleFormatValid = /^.*/i.test(airDrop);

    setAirDropTitle(isAirDropTitleFormatValid);
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

  const checkBgUrlValidity = () => {
    if (bgLogoUrl.trim() === "") {
      setIsValidBgLogoUrl(false);
      return;
    }

    // You can use any regex or logic to validate the logo url format
    const isLogoUrlFormatValid = /^https?:\/\/.+\/.+.(png|jpg|jpeg|svg)$/i.test(
      bgLogoUrl
    );

    setIsValidBgLogoUrl(isLogoUrlFormatValid);
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
    return (
      isValidLogoUrl && isValidDescription && isValidWebsiteUrl && airDropTitle
    );
  };

  useEffect(() => {
    onStepValidation(isFormValid());
  }, [
    isValidLogoUrl,
    isValidWebsiteUrl,
    isValidDescription,
    airDropTitle,
    onStepValidation,
  ]);

  return (
    <>
      <div>
        <CustomInput
        className="mb-4"
          id="description"
          name="Description"
          type="text"
          placeholder="Your description"
          value={description}
          onChange={handleDescriptionChange}
          onBlur={checkDescriptionValidity}
          required
        />
        <CustomInput
        className="mb-4"
          id="airDropTitle"
          name="Airdrop Title"
          type="text"
          placeholder="Ex: Airdrop Title"
          value={airDrop}
          onChange={handleAirDropTitleChange}
          onBlur={checkAirDropTitleValidity}
          required
          // isValid={isValidLogoUrl}
          errorMessage="Invalid Title"
        />
        <CustomInput
        className="mb-4"
          id="logoUrl"
          name="Logo URL"
          type="text"
          placeholder="Ex: https://logo.png"
          value={logoUrl}
          onChange={handleLogoUrlChange}
          onBlur={checkLogoUrlValidity}
          required
          isValid={isValidLogoUrl}
          errorMessage="Invalid logo URL"
        />
        <CustomInput
        className="mb-4"
          id="bgLogoUrl"
          name="Background Image URL"
          type="text"
          placeholder="Ex: https://logo.png"
          value={bgLogoUrl}
          onChange={handleBgLogoUrlChange}
          onBlur={checkBgUrlValidity}
          required
          isValid={isValidBgLogoUrl}
          errorMessage="Invalid BG logo URL"
        />
        <CustomInput
        className="mb-4"
          id="websiteUrl"
          name="Website"
          type="text"
          placeholder="Ex: https://.."
          value={websiteUrl}
          onChange={handleWebsiteUrlChange}
          onBlur={checkWebsiteUrlValidity}
          required
          isValid={isValidWebsiteUrl}
          errorMessage="Invalid website URL"
        />
        <CustomInput
        className="mb-4"
          id="facebook"
          name="Facebook"
          type="text"
          placeholder="Ex:https://Facebook.com/.."
          value={facebook}
          onChange={handleFacebookChange}
        />
        <CustomInput
        className="mb-4"
          id="twitter"
          name="Twitter"
          type="text"
          placeholder="Ex:https://Twitter.com/.."
          value={twitter}
          onChange={handleTwitterChange}
        />
        <CustomInput
        className="mb-4"
          id="github"
          name="Github"
          type="text"
          placeholder="Ex:https://Github.com/.."
          value={github}
          onChange={handleGithubChange}
        />
        <CustomInput
        className="mb-4"
          id="telegram"
          name="Telegram"
          type="text"
          placeholder="Ex:https://Telegram.com/.."
          value={telegram}
          onChange={handleTelegramChange}
        />
        <CustomInput
        className="mb-4"
          id="instagram"
          name="Instagram"
          type="text"
          placeholder="Ex:https://Instagram.com/.."
          value={instagram}
          onChange={handleInstagramChange}
        />
        <CustomInput
        className="mb-4"
          id="discord"
          name="Discord"
          type="text"
          placeholder="Ex:https://Discord.com/.."
          value={discord}
          onChange={handleDiscordChange}
        />
        <CustomInput
        className="mb-4"
          id="reddit"
          name="Reddit"
          type="text"
          placeholder="Ex:https://Reddit.com/.."
          value={reddit}
          onChange={handleRedditChange}
        />
        <CustomInput
        className="mb-4"
          id="youtube"
          name="Youtube Video"
          type="text"
          placeholder="Ex:https://Youtube.com/.."
          value={youtube}
          onChange={handleYoutubeChange}
        />
      </div>
    </>
  );
};

export default AirdropAdditionalInformation;
