// Utility function to get a field by a string path
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFieldByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}
