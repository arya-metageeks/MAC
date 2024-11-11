const KeyFeaturesTab = () => {
  return (
    <div>
      <h1 className="text-xl mb-5">Keys Features</h1>
      <div className="grid grid-cols-2 gap-8">
        <KeyFeatureCard />
        <KeyFeatureCard />
        <KeyFeatureCard />
      </div>
    </div>
  );
};

const KeyFeatureCard = () => {
  return (
    <div className="bg-black rounded-xl px-6 py-6 flex flex-col gap-3">
      <h3>Feature 01</h3>
      <p className="text-sm text-[#b4b4b4]">Decentralised Feature 01</p>
      <p className="text-sm text-[#b4b4b4]">
        On the Kava chain there is no significant competition to the Kinetix
        DeFI hub, the Kava chain is very supportive of the project and has
        invested in the project to support its success.
      </p>
    </div>
  );
};

export default KeyFeaturesTab;
