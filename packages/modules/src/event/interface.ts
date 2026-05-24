export enum Subject {
  ACADEMIC_AND_SCIENTIFIC,
  AGRO,
  CRAFTS,
  HOME_AND_LIFESTYLE,
  CINEMA_AND_PHOTOGRAPHY,
  PERSONAL_DEVELOPMENT,
  DESIGN_METRICS_AND_DIGITAL_PRODUCTS,
  LAW_AND_LEGISLATION,
  ENTREPRENEURSHIP_BUSINESS_AND_INNOVATION,
  EROTIC_ADULT_AND_EXPLICIT,
  SPORTS,
  GAMES_AND_GEEK,
  GASTRONOMY_FOOD_AND_DRINKS,
  GOVERNMENT_AND_POLITICS,
  TECHNOLOGY_AND_PROGRAMMING,
  MARKETING_AND_SALES,
  FASHION_AND_BEAUTY,
  MUSIC,
  OTHER,
  RELIGION_AND_SPIRITUALITY,
  HEALTH_NUTRITION_AND_WELLNESS,
  SOCIETY_AND_CULTURE,
  THEATER_STANDUP_AND_DANCE,
}

export enum Category {
  COMPETITION_OR_TOURNAMENT,
  RACE,
  COURSE_CLASS_TRAINING_OR_WORKSHOP,
  DRIVE_IN,
  SHOWS,
  FAIR_FESTIVAL_OR_EXHIBITION,
  PARTY_FESTIVAL_OR_SHOW,
  MEETUP_OR_NETWORKING_EVENT,
  MASS_OR_WORSHIP_SERVICE,
  OTHER,
  LECTURE_CONGRESS_OR_SEMINAR,
  TOURS_EXCURSIONS_OR_GUIDED_TOURS,
  RETREAT_OR_CAMP,
}

interface Schedule {
  startDatetime: Date;
  endDatetime: Date;
}

type Address = any;

interface Ticket {
  name: string;
  count: string;
  value: string;
  schedule: Schedule;
  limits: {
    min: number;
    max: number
  };
  description: string;
}

export interface Event {
  id: string;
  ownerId: string;
  name: string;
  image: string;
  description: string;
  subject: Subject;
  category: Category;
  schedule: Schedule;
  address: Address;
  tickets: Ticket[];
};