# Ahmet Mersin - Interactive CV Website

This is a modern, interactive CV website built with [Next.js](https://nextjs.org/) and React. It features a responsive design, dynamic language switching (English/Turkish), and a built-in PDF generator.

## 🚀 Features

-   **Dynamic Content:** Switch seamlessly between English and Turkish.
-   **PDF Export:** Generate a print-ready, single-page PDF of the CV directly from the browser using `@react-pdf/renderer`.
-   **Responsive Design:** optimized for all devices (Mobile, Tablet, Desktop).
-   **Cybersecurity Focus:** Tailored layout to highlight skills, certifications (Mitre ATT&CK, Wireshark, etc.), and professional experience.

## 🛠️ Technologies

-   **Framework:** Next.js 16.1
-   **Language:** TypeScript
-   **Styling:** CSS Modules / Global CSS
-   **PDF Generation:** @react-pdf/renderer
-   **Font:** Inter (Web), Roboto (PDF - for full Turkish character support)

## 📦 Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📄 PDF Generation Details

The PDF generation logic is located in `src/components/CVDocument.tsx`. It uses the **Roboto** font to ensure all Turkish characters (Ş, İ, ğ, etc.) are rendered correctly. The layout is optimized to fit strictly on a single A4 page by carefully managing padding and font sizes.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
