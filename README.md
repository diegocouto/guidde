<img src="https://user-images.githubusercontent.com/1069623/151846636-f10b5ea4-b564-4685-b689-de5bea964732.svg" alt="Logo" height="42" />

# Guidde

A simple customer support tool for your projects built with Next.js. **[Check out a live demo](https://guidde.vercel.app/)**.

<img src="https://user-images.githubusercontent.com/1069623/151846646-1cb6dbda-3d4f-4954-a353-194e90e108ed.png" alt="Demo" />

## Getting started

To get Guidde up and running in your local environment:

1. Clone the code locally: `git clone git@github.com:diegocouto/guidde.git`
2. Install all dependencies: `cd guidde && yarn install`
3. Run it in development mode: `yarn dev`

## Make it yours

Before you can start preparing to publish your new knowledge base, you might want to update and implement a few things:

- Set your own name, brand URL and social links on `/utils/constants/app.ts`
- Make sure you have updated `.env.production` to match the URL of your knowledge base
- You can easily update the primary color on `tailwind.config.js`

### Keeping track of customer support requests

You probably noticed that a **Contact us** button is available on Guidde's main navigation bar. Although the form itself is ready to use, you'll have to implement your own logic to submit this content in a way that makes sense for your current workflow.

In order to do so, update `api/messages.ts`. Here you can see an example of how it would look like when using SendGrid to send your messages:

```typescript
import Mail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

Mail.setApiKey(process.env.SENDGRID_API_KEY);

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body) {
    const { email, subject, message } = JSON.parse(req.body);

    const msg = {
      to: 'support@yourdomain.com',
      from: 'support@yourdomain.com',
      replyTo: email,
      subject: subject,
      text: message,
    };

    if (process.env.SENDGRID_API_KEY) {
      return Mail.send(msg)
        .then(() => {
          res.json({ success: true });
        })
        .catch((error) => {
          console.error(error);
          res.json({ success: false });
        });
    }

    res.json({ success: false });
  }
};
```

## Deploy

As a Next.js app, you have many options and different services where you can deploy your new knowledge base to. It's strongly recommended that you [check Next.js's deployment documentation](https://nextjs.org/docs/deployment) to choose what's the approach that makes more sense to you.
