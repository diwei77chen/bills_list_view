# Bills List View

## User Story
As a user, I want to see a list of my deferit bills in one place. This includes:
1. a thumbnail of the bill image I uploaded so I know what bill it is. If I click on this thumbnail I want to see the full image so that I can check it out properly.

1. the amount of my bill

1. the date of my bill

1. the status of my bill (processing, scheduled, unable to pay, paid)

1. an additional information pop-up next to fields I may not immediately understand (e.g. status) to give me some more information about this field (e.g. Processing: This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day. Scheduled: This bill is scheduled to be paid and will be paid on the due date, you're in good hands!, etc.)

1. Load only 10 (or some pr-defined number) bills at the time

1. An infinite scroll to load next batch of bills if there are any

## Run the project:

*Note: This project is tested on iOS only.*

### 1. Install the dependent packages:

  * `npm ci`

### 2. Install pods on ios/:

  * `pod install`

### 3. Start a local bundler on the project:

  * `npm start`

### 4. Run on iOS(14.0):  
  * `npx react-native run-ios`
