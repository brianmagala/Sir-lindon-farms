import fs from 'fs';
import path from 'path';
import DomeGallery from '@/components/DomeGallery';

export default function GalleryPage() {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    let files: string[] = [];

    try {
        files = fs
            .readdirSync(galleryDir)
            // Include common image extensions plus JFIF
            .filter((file) => /\.(png|jpe?g|gif|webp|avif|jfif)$/i.test(file));
    } catch {
        files = [];
    }

    const hasUploads = files.length > 0;
    const placeholderIcons = Array.from({ length: 12 }, (_, i) => ({
        id: `placeholder-${i + 1}`,
        icon: ['🌾', '🐄', '🥕', '🌻'][i % 4],
    }));

    // Map files to paths DomeGallery expects
    const imagePaths = files.map(file => `/gallery/${file}`);

    return (
        <main>
            <section className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-accent mb-4">Gallery</h1>
                    <p className="text-accent/80">Visual tour of Sir Lindon Farms</p>
                </div>
            </section>

            <section className="bg-[#060010] flex flex-col items-center w-full">
                {hasUploads ? (
                    <div className="w-full relative h-[800px] overflow-hidden">
                        <DomeGallery
                            images={imagePaths}
                            fit={1.2}
                            minRadius={600}
                            maxVerticalRotationDeg={0}
                            segments={34}
                            dragDampening={3.6}
                            grayscale={false}
                        />
                    </div>
                ) : (
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {placeholderIcons.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-48 flex items-center justify-center bg-accent/20 text-6xl transform hover:-translate-y-1"
                                >
                                    {item.icon}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}