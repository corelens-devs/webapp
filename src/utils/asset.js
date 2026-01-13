export const image = (path) => {
  const fullPath = `/images/${path}`;
  return fullPath;
};
export const video = (name) => `/videos/${name}`;
export const asset = (path) => `/${path}`;