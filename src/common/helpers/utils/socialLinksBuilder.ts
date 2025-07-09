export const ToFacebookUrl = (facebookUsername: string) => {
  return facebookUsername && facebookUsername !== ''
    ? `https://www.facebook.com/${facebookUsername}`
    : null;
};

export const ToTwitterUrl = (twitterUsername: string) => {
  return twitterUsername && twitterUsername !== ''
    ? `https://twitter.com/${twitterUsername}`
    : null;
};

export const ToTelegramUrl = (telegramUsername) => {
  return telegramUsername && telegramUsername !== ''
    ? `https://t.me/${telegramUsername}`
    : null;
};
