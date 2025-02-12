# Running the React App

To run the React app, follow these steps:

## Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and npm installed.

## Steps to Run the App

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production
To create a production-ready build:
```sh
npm run build
```

## Using the Button Component
The `ButtonComponent` supports the following props:

```tsx
import ButtonComponent from "./ButtonComponent";
```

### Props
- `text` *(string)* - Button label
- `loading` *(boolean)* - Show a loading spinner when `true`
- `onClick` *(function)* - Click event handler
- `active` *(boolean)* - Enables or disables interaction
- `bg_color` *(string)* - Background color
- `text_color` *(string)* - Text color
- `border_color` *(string)* - Border color
- `icon` *(ReactNode, optional)* - Icon to display inside the button

