import MetaMaskOnboarding from '@metamask/onboarding';

const onboarding = new MetaMaskOnboarding();

const onClickInstall = () => {
  const textButton = 'Install';
  // On this object we have startOnboarding which will start the onboarding process for our end user
  onboarding.startOnboarding();
  return textButton;
};

export default onClickInstall;
