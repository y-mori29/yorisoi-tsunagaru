import { LetterVoicePage } from "@/components/screens/voice/LetterVoicePage";
import { UchiakeStoryArticle, type UchiakeStory } from "@/components/screens/voice/UchiakeStoryArticle";
import uchiakeStories from "@/lib/data/uchiake-stories.json";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function VoicePage({ params }: PageProps) {
  const { id } = await params;

  if (id.startsWith("uchiake-")) {
    const story = (uchiakeStories as Record<string, UchiakeStory>)[id];
    if (story) {
      return <UchiakeStoryArticle story={story} />;
    }
  }

  return <LetterVoicePage id={id} />;
}
