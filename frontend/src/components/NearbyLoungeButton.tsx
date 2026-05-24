import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  distance: number;  // km
}

export function NearbyLoungeButton({ distance }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      size="lg"
      className="
        h-auto
        min-h-10
        w-full
        rounded-lg
        bg-zinc-900
        px-5
        py-3
        text-sm
        font-bold
        text-white
        shadow-sm
        hover:bg-zinc-800
      "
      onClick={() => navigate('/map?focus=nearest')}
    >
      <MapPin className="mr-2 h-5 w-5" />
      라운지 보기 {distance} km
    </Button>
  );
}
