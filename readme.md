# Parking Slot App

## Installation

1. Clone this repository

   `git clone https://github.com/ilhamfi27/parking-slot.git`

2. `cd parking-slot`
3. Open your favourite terminal
4. Run command

   `docker-compose up`
5. Ready for development

## Endpoints

| No  | Endpoint            | Body                   |
| --- | ------------------- | ---------------------- |
| 1   | /parking-slot/park  | { car_number: String } |
| 2   | /parking-slot/leave | { car_number: String } |
