# MaizeMeet

MaizeMeet is a partially completed campus-events application used for a React Native maintenance assignment. It uses Expo SDK 57, React Navigation, RNEUI, SQLite, AsyncStorage, and SecureStore.

## Run The App

Requirements:

- Node.js 20.19 or newer
- Expo Go or an iOS/Android simulator

```bash
npm install
npm start
```

The dummy login credentials are pre-filled on the login screen.

## Storage

| Data | Storage |
|---|---|
| Session | SecureStore |
| Display preferences | AsyncStorage |
| Events, saved events, registrations, and notes | SQLite |

## QA Reports

### QA-01: Discover cache duplicates events

After closing and reopening the app several times, every event started appearing more than once. It seems like the Discover cache is not being cleared between launches.

### QA-02: Saved button feels unreliable

The heart does not always reflect whether an event is saved. I tapped it several times because I was unsure it worked, and afterward the Saved screen contained repeated or outdated entries.

### QA-03: Wrong event details

I searched for an event and tapped one of the results, but the details screen showed a different event. This seems more likely after searching or selecting a category.

### QA-04: One event crashes the screen

Most events open normally, but one of the mixer events caused a red error screen. I did not record which mixer it was.

### QA-05: Event date differs between phones

The same event appears on Tuesday on my phone and Wednesday on a coworker's phone. Our devices may have different regional or timezone settings.

### QA-06: Category buttons miss taps

The category buttons may have a touch-handling problem. Sometimes I select a category and the event list does not change. Search is also sensitive to capitalization and extra spaces.

### QA-07: Settings do not restore correctly

I turned a display setting off, but it was enabled again after restarting the app. The dark theme also updates only parts of the interface.

### QA-08: Event text is cut off

Long event names are clipped on my phone. I use a larger system text size, which might be related.

### QA-09: Keyboard hides the login button

On the smaller test phone, opening the keyboard covers part of the login screen. I can continue only after dismissing the keyboard.

### QA-10: Some notes do not save

A note containing an apostrophe, such as `Dean's event`, does not save correctly. The last few characters can also disappear when I leave the screen immediately after typing.

### QA-11: Reset does not clear everything

After using **Reset App Data** and signing in again, some saved events or notes are still present.

### QA-12: Refresh leaves Discover stuck

When the simulated refresh fails, the existing event list disappears and the loading indicator continues indefinitely.

## Feature Requests

Each team must complete two requests from this backlog. Size estimates are preliminary.

### FR-01: Compact Event Cards

**Estimated size:** Small

Users want to see more events without scrolling. Add an option to switch between the current cards and a more compact layout.

The selected layout should be remembered after restarting the app. Both layouts must remain readable and accessible.

### FR-02: Saved-Event Sorting

**Estimated size:** Small / Medium

Add controls to sort saved events by:

- Soonest date
- Event title

The selected sorting option should be visible and remembered between sessions. Changing the Saved order must not affect Discover.

### FR-03: Capacity Indicators

**Estimated size:** Medium

Show whether each event is:

- Available
- Almost full
- Full
- Registration not required

Users must be able to understand the status without relying only on color. Events without a capacity limit should be handled appropriately.

### FR-04: Improve Private Notes

**Estimated size:** Medium

Users want clearer feedback while editing private notes.

Add:

- A character count
- An indication that changes are being saved
- Confirmation when saving succeeds
- A visible error when saving fails

Recent changes must not be lost when the user immediately leaves the screen.

### FR-05: Add Local Events

**Estimated size:** Large

Allow users to create an event with:

- Title
- Date and time
- Category
- Location
- Capacity

Required fields should be validated with useful messages. New events must appear in Discover and remain available after restarting the app.

This feature only needs to support locally created events; server synchronization is out of scope.

### FR-06: Improve Empty and Error States

**Estimated size:** Small

Discover currently presents similar feedback for several different situations. Show an appropriate message when:

- Filters produce no matches
- No events exist
- Events cannot be loaded

When filters produce no matches, provide a clear way to reset them. Error states should offer a reasonable recovery action where possible.
