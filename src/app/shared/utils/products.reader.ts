export function fileProducts(file: File): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const fileContent = event.target.result;
            const lines = fileContent.split('\n');
            const trimmedLines = lines.map((line: string) => line.trim());
            resolve(trimmedLines);
        }
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsText(file);
    });
}