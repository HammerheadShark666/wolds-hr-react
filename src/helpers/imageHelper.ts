 
export function getEmployeePhotoUrl(filename: string) : string { 
  return `${process.env.REACT_APP_AZURE_STORAGE_URL}${process.env.REACT_APP_STORAGE_EMPLOYEES}/${filename}`; 
}