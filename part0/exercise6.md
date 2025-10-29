```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser sends a POST request to the server with the contents and date of the new note created in JSON format

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: new_note_spa
    deactivate server

    Note right of browser: The server sends back json file of the new note and it causes the JS file to run to add the new note to the page without the page having to refresh
