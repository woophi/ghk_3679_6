declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', v: string) => void;
  }
}

type Payload = {
  period: '1_year' | '1_month' | `${number}_months`;
  sum: number;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbx7C1ODKkf5EcxfmUA6Sq_SQktMaC2zt6YD1NBVt5Hu0H26NK04ExsVBmnxBLG6WZ2G/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, ...payload, variant: 'ghk_3679_6' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
