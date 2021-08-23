# Parking Slot App

## Installation

1. Clone this repository

   `git clone https://github.com/ilhamfi27/parking-slot.git`

2. `cd parking-slot`
3. Open your favourite terminal
4. Run command for creating your own .env file

   `cp .env.example .env`
5. Run command for create docker container for development

   `docker-compose up -d`
6. Run command for migrating database

   `docker exec -it parking_slot-web npx prisma migrate dev`
7. Run command for seed data to database

   `docker exec -it parking_slot-web npx prisma db seed --preview-feature`
8. Ready for development

## Endpoints

| No  | Endpoint            | Body                   |
| --- | ------------------- | ---------------------- |
| 1   | /parking-slot/park  | { car_number: String } |
| 2   | /parking-slot/leave | { car_number: String } |

## Exposed Port By Docker Compose
1. MySQL: 45045
2. PHPMyAdmin: 46046
3. NodeJS Web: 8080