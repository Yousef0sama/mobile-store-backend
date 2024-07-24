
// check type

export function checkType (field : any, type : string) {
  return typeof field === type;
}

// is empty

export function isEmpty (field : any)  {
  return field === undefined || field === null || field === '' || (Array.isArray(field) && field.length === 0);
}

export default function checkInputs (field : any, type : string, fieldName : string) : string | undefined {
  if (isEmpty(field)) {
    return `${fieldName} can't be empty`;
  }
  if (!checkType(field, type)) {
    return `${fieldName} must be ${type}`
  }
  return;
}
