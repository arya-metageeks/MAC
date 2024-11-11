"use client";
import React, { useState, useEffect, useContext } from "react";
// import FormContext from "@/contexts/create/FormContext";
import Image from "next/image";
import { useFormContext } from "@/context/FormContext";
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
    event: React.ChangeEvent<HTMLTextAreaElement>
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
  useEffect(() => {
    checkLogoUrlValidity();
    checkWebsiteUrlValidity();
    checkDescriptionValidity();
  }, [logoUrl, websiteUrl, description]);

  const isFormValid = (): boolean => {
    return isValidLogoUrl && isValidDescription && isValidWebsiteUrl;
  };

  useEffect(() => {
    onStepValidation(isFormValid());
  }, [isValidLogoUrl, isValidWebsiteUrl, onStepValidation]);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="logoUrl" className="custom-label">
                Logo URL
              </label>
            </p>
            <input
              id="logoUrl"
              name="logoUrl"
              type="text"
              placeholder="Ex: https://logo.png"
              className="custom-input"
              value={logoUrl}
              onChange={handleLogoUrlChange}
              required
            />
            {!isValidLogoUrl && logoUrl.trim() !== "" && (
              <p className="text-red-500">Invalid logo URL</p>
            )}
          </div>
         <div className="col-span-1">
         <p className="mb-1">
            <label htmlFor="logoUrl" className="custom-label">
              Background Image URL
            </label>
          </p>
          <input
            id="bgLogoUrl"
            name="bgLogoUrl"
            type="text"
            placeholder="Ex: https://logo.png"
            className="custom-input"
            value={bgLogoUrl}
            onChange={handleBgLogoUrlChange}
            required
          />
          {/* {!isValidBgLogoUrl && bgLogoUrl.trim() !== "" && (
          <p className="custom-inputAlert">Invalid BG logo URL</p>
        )} */}
         </div>
          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="websiteUrl" className="custom-label">
                Website
              </label>
            </p>
            <input
              id="websiteUrl"
              name="websiteUrl"
              type="text"
              placeholder="Ex: https://.."
              className="custom-input"
              value={websiteUrl}
              onChange={handleWebsiteUrlChange}
              required
            />
            {!isValidWebsiteUrl && websiteUrl.trim() !== "" && (
              <p className="text-red-500">Invalid website URL</p>
            )}
          </div>

          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="facebook" className="custom-label">
                Facebook
              </label>
            </p>
            <input
              id="facebook"
              name="facebook"
              type="text"
              placeholder="Ex:https://Facebook.com/.."
              className="custom-input"
              onChange={handleFacebookChange}
            />
          </div>
          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="twitter" className="custom-label">
                Twitter
              </label>
            </p>
            <input
              id="twitter"
              name="twitter"
              type="text"
              placeholder="Ex:https://Twitter.com/.."
              className="custom-input"
              onChange={handleTwitterChange}
            />
          </div>
          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="github" className="custom-label">
                Github
              </label>
            </p>
            <input
              id="github"
              name="github"
              type="text"
              placeholder="Ex:https://Github.com/.."
              className="custom-input"
              onChange={handleGithubChange}
            />
          </div>
          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="telegram" className="custom-label">
                Telegram
              </label>
            </p>
            <input
              id="telegram"
              name="telegram"
              type="text"
              placeholder="Ex:https://Telegram.com/.."
              className="custom-input"
              onChange={handleTelegramChange}
            />
          </div>
          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="instagram" className="custom-label">
                Instagram
              </label>
            </p>
            <input
              id="instagram"
              name="instagram"
              type="text"
              placeholder="Ex:https://Instagram.com/.."
              className="custom-input"
              onChange={handleInstagramChange}
            />
          </div>
          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="discord" className="custom-label">
                Discord
              </label>
            </p>
            <input
              id="discord"
              name="discord"
              type="text"
              placeholder="Ex:https://Discord.com/.."
              className="custom-input"
              onChange={handleDiscordChange}
            />
          </div>
          <div className="col-span-1">
            <p className="mb-1">
              <label htmlFor="reddit" className="custom-label">
                Reddit
              </label>
            </p>
            <input
              id="reddit"
              name="reddit"
              type="text"
              placeholder="Ex:https://Reddit.com/.."
              className="custom-input"
              onChange={handleRedditChange}
            />
          </div>
          <div className="col-span-2">
            <p className="mb-1">
              <label htmlFor="youtube" className="custom-label">
                Youtube Video
              </label>
            </p>
            <input
              id="youtube"
              name="youtube"
              type="text"
              placeholder="Ex:https://Youtube.com/.."
              className="custom-input"
              onChange={handleYoutubeChange}
            />
          </div>
        <div className="col-span-2">
          <p className="mb-1">
            <label htmlFor="description" className="custom-label">
              Description
            </label>
          </p>
          <textarea
            rows={10}
            id="description"
            name="description"
            placeholder="Your description"
            className="custom-input"
            style={{ borderRadius: "20px" }}
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
      </div>

    </>
  );
};

export default AddAdditional;
