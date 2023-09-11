const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateRandomAvatarUrl = () => {
  const randomSeed = generateRandomString(10); // Change 10 to any length you desire
  const url = `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${randomSeed}`;
  return url;
};
