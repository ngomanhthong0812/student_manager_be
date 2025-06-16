import { Class } from "../models";

export const fetchAllClasses = async () => {
  const classes = await Class.findAll();
  return classes;
};
