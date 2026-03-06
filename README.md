# socket-react

`socket-react` is a lightweight, optimized, and clean React wrapper around `socket.io-client`. It provides an easy way to manage Socket.io connections in your React applications using context and hooks.

## Features

- 🚀 **Easy Setup**: Hook into your React app in minutes.
- 🛠 **Optimized**: Managed connection lifecycle with automatic cleanup.
- 🎣 **Clean API**: Access socket instance and connection status via custom hooks.
- 📝 **Type Safe**: Written in TypeScript with full type support.

## Installation

```bash
npm install socket-react socket.io-client
```

or

```bash
yarn add socket-react socket.io-client
```

## Quick Start

Wrap your application with `SocketProvider` and use the `useSocket` hook in your components.

### 1. Set up the Provider

```tsx
// App.tsx
import { SocketProvider } from "socket-react";

function App() {
  return (
    <SocketProvider uri="http://localhost:4000">
      <MyComponent />
    </SocketProvider>
  );
}
```

### 2. Use the Hook

```tsx
// MyComponent.tsx
import { useSocket } from "socket-react";

function MyComponent() {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        console.log("Received:", data);
      });
    }
  }, [socket]);

  return (
    <div>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <button onClick={() => socket?.emit("ping")}>Send Ping</button>
    </div>
  );
}
```

## API Reference

### `SocketProvider`

The `SocketProvider` component initializes the socket connection and provides it to the rest of your app.

| Prop       | Type                                                 | Description                                                                                  |
| :--------- | :--------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `uri`      | `string` (optional)                                  | The server URL to connect to. If not provided, it defaults to the host that serves the page. |
| `options`  | `Partial<ManagerOptions & SocketOptions>` (optional) | Configuration options for `socket.io-client`. See below for details.                         |
| `children` | `React.ReactNode`                                    | Your application components.                                                                 |

### Common Options

The `options` prop accepts any valid options from `socket.io-client`. Here are some of the most commonly used ones:

| Option                 | Type                       | Default                    | Description                                              |
| :--------------------- | :------------------------- | :------------------------- | :------------------------------------------------------- |
| `autoConnect`          | `boolean`                  | `true`                     | Whether to connect automatically on creation.            |
| `reconnection`         | `boolean`                  | `true`                     | Whether to allow reconnection if the connection is lost. |
| `reconnectionAttempts` | `number`                   | `Infinity`                 | Number of reconnection attempts before giving up.        |
| `reconnectionDelay`    | `number`                   | `1000`                     | Initial delay before trying to reconnect (ms).           |
| `transports`           | `string[]`                 | `["polling", "websocket"]` | Preferred transport methods (e.g., `["websocket"]`).     |
| `auth`                 | `object` \| `(cb) => void` | `{}`                       | Authentication data (e.g., `{ token: "..." }`).          |
| `query`                | `object`                   | `{}`                       | Additional query parameters for the connection.          |
| `timeout`              | `number`                   | `20000`                    | Connection timeout in milliseconds.                      |

#### Example with Options

```tsx
const options = {
  reconnectionAttempts: 5,
  transports: ["websocket"],
};

<SocketProvider uri="http://localhost:4000" options={options}>
  {/* children */}
</SocketProvider>;
```

### `useSocket()`

The `useSocket` hook provides access to the socket instance and its state.

**Returns:**

| Property        | Type                  | Description                                   |
| :-------------- | :-------------------- | :-------------------------------------------- |
| `socket`        | `Socket \| undefined` | The socket.io-client instance.                |
| `isConnected`   | `boolean`             | True if the socket is currently connected.    |
| `socketId`      | `string \| undefined` | The unique ID of the socket connection.       |
| `isInitialized` | `boolean`             | True if the socket instance has been created. |

## License

MIT
