type ErrorsType = { [key: string]: string[] };

function hasError(errors: ErrorsType): boolean {
  for (let key of Object.keys(errors)) {
    if (errors[key].length > 0) {
      return true;
    }
  }
  return false;
}

export function useErrors() {
  return {
    hasError,
  };
}
