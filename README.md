# MOONBLOOM

Video URL : https://youtu.be/kk1KF1aWzEI

MoonBloom is a menstrual cycle tracking application developed using React.js, HTML, and CSS. The application is designed to help users monitor their menstrual cycles, predict future periods, and track ovulation days. The app includes features such as customizable cycle length, period length, a dark mode toggle, and a key panel for visual cues. Additionally, MoonBloom includes a basic login, although the credentials are currently hardcoded.

Email = moon@bloom.com
Password = moonbloom123

 File Descriptions

# src/components Directory

- App.js:  
  This is the main component of the MoonBloom application. It orchestrates the rendering of other components such as Header, Calendar, SettingsPanel, and KeyPanel. It manages the global state of the application, including dark mode, visibility of the settings and key panels, and period data. The App.js file is responsible for holding the application's core logic, such as saving settings, toggling dark mode, and adding/removing period dates.

- Header.js:  
  The Header component is responsible for rendering the top navigation bar of the application. It includes buttons for toggling dark mode, accessing the settings panel, and showing the key panel. The logo "MoonBloom" is displayed centrally, ensuring brand consistency across the application.

- Calendar.js:  
  The Calendar component is a crucial part of the application, responsible for rendering the monthly view of the calendar. It visually distinguishes between normal days, period days, and ovulation days using different colors. The component also handles the logic for predicting future periods and ovulation based on user input, allowing users to mark or unmark dates as period days.

- SettingsPanel.js:  
  This component allows users to customize their menstrual cycle length and period length. The values entered here influence the predictions shown on the Calendar. The SettingsPanel is conditionally rendered based on user interaction, making it easily accessible yet unobtrusive.

- KeyPanel.js:  
  The KeyPanel component provides a legend to the user, explaining the color codes used in the Calendar to represent normal days, period days, and ovulation days. This component is also conditionally rendered, appearing only when the user requests it.

- LoginSignup.js:  
  The LoginSignup component handles the user authentication simulation. It allows users to toggle between login and signup forms, though both currently authenticate using hardcoded credentials. The component serves as the gateway to the main application, demonstrating a basic, static approach to user authentication.

# src/styles Directory

- App.css:  
  This file contains the global styles applied to the entire application. It defines the base font, colors, and background settings, and includes styles for dark mode. The styles here ensure a cohesive look and feel throughout the application.

- Header.css:  
  Specific to the Header component, this stylesheet ensures the header is visually distinct and functions well in both light and dark modes. It styles the logo, buttons, and navigation layout.

- Calendar.css:  
  The Calendar.css file styles the calendar grid, including the day headers, individual date cells, and their various states (normal, period, ovulation). The styles ensure that the calendar is clear, user-friendly, and visually appealing, with appropriate use of color and spacing.

- SettingsPanel.css:  
  This file styles the settings panel, including input fields and buttons. The design is intended to be clean and functional, ensuring that users can easily customize their settings without distraction.

- KeyPanel.css:  
  The KeyPanel stylesheet ensures that the color legend is clearly visible and accessible. The panel is designed to be compact yet informative, providing users with a quick reference to the calendar's color coding.

- LoginSignup.css:  
  The LoginSignup.css file styles the login and signup forms. It centers the form on the page and uses a color scheme consistent with the rest of the application, ensuring a seamless user experience from the moment they enter the application.

# public/index.html

- The index.html file is the entry point for the React application. It includes basic metadata and a root div where the React app is mounted. The title of the document is set to "MoonBloom," ensuring brand consistency.

# src/index.js

- The index.js file serves as the entry point for the React application, rendering the App component into the root div of index.html. It also imports global styles and wraps the application in React's Strict Mode, ensuring best practices are followed.

 Design Choices

# UI Considerations
The design of MoonBloom prioritizes simplicity and ease of use. I decided to use a minimalistic color palette, with soft pastels for normal days and more vibrant colors for period and ovulation days, to ensure clarity while maintaining a visually pleasing interface. I added the dark mode due to my own personal preference, particularly in low-light environments.

# Component Structure
The application was built with scalability in mind. Each feature is encapsulated in its own component, allowing for easy maintenance and future expansion. For example, the Calendar component handles all calendar-related logic, making it straightforward to update or extend without affecting other parts of the app.

# Hardcoded Authentication
While the current login system uses hardcoded credentials, this was a deliberate choice (for now).
