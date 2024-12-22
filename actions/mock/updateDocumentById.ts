export const UpdateDocumentById = async (
  documentId: string,
  content: string,
) => {
  localStorage.setItem(`$$__document_${documentId}`, content);
};
