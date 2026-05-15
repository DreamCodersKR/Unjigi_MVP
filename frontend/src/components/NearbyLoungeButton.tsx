import { Button } from '@/components/ui/button';
//import { Badge } from '@/components/ui/badge';
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
      className="w-full mt-6"
      onClick={() => navigate('/map?focus=nearest')}
    >
      <MapPin className="mr-2 h-5 w-5" />
      라운지 보기  {distance} km
      {/* <Badge variant="secondary" className="ml-2">
        {distance} km
      </Badge> */}
    </Button>
  );
}
