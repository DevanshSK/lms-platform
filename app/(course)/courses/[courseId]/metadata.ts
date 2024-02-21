// metadata.js
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
    { params }: { params: { courseId: number } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const courseId = params.courseId

    // fetch data
    const course = await fetch(`https://addlearn.vercel.app/course/${courseId}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    console.log("COURSE", course);

    return {
        title: course.course_name,
        openGraph: {
            images: [...previousImages],
        },
    }
}