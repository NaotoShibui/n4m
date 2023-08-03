export const dataProperties = ['fileName', 'libraryName', 'supplier'];
export const SoundArchive = {
  FileName: 'fileName',
  LibraryName: 'libraryName',
  Supplier: 'supplier',
} as const;
export type SoundArchive = typeof SoundArchive[keyof typeof SoundArchive]; 

export type Filter = {
    [SoundArchive.LibraryName]: string;
    [SoundArchive.Supplier]: string;
}