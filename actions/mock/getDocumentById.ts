export const GetDocumentById = async (documentId: string) => {
  return localStorage.getItem(`$$__document_${documentId}`);
};
