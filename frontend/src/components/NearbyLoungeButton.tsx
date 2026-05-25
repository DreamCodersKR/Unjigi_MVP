import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./NearbyLoungeButton.css";

interface Props {
  distance: number;  // km
}

export function NearbyLoungeButton({ distance }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      size="lg"
      className="nearby-lounge-button"
      onClick={() => navigate('/map?focus=nearest')}
    >
      <MapPin className="nearby-lounge-button__icon" />
      라운지 보기 {distance} km
    </Button>
  );
}
