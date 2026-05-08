from pydantic import BaseModel 

class LoungeRead(BaseModel):
    id: str
    name: str
    type: str # "lounge" | "rest_area"
    lat: float
    lng: float
    facility_shower: bool
    facility_sleep_room: bool
    facility_laundry: bool
    facility_restaurant: bool
    total_seats: int
    sido: str | None = None
    sigungu: str | None = None
    
    model_config = {"from_attributes": True}