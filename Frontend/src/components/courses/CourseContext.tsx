import React from "react";

interface CourseContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  dataSaved: boolean;
  setDataSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CourseContext = React.createContext<CourseContextType>({} as CourseContextType);

const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = React.useState<FormData>(new FormData());
  const [dataSaved, setDataSaved] = React.useState<boolean>(false);

  return (
    <CourseContext.Provider value={{ formData, setFormData, dataSaved, setDataSaved }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;