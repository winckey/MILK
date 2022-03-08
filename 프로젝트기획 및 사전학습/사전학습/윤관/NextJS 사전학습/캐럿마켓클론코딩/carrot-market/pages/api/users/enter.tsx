import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { prisma } from "@prisma/client";
import twilio from "twilio";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENGRID_API_KEY);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // if (req.method !== "POST") {
  //   res.status(401).end();
  // }
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  // if (email) {
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (user) console.log("Found it");
  //   if (!user) {
  //     console.log("Did not find. Will create");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (user) console.log("Found it");
  //   if (!user) {
  //     console.log("Did not find. Will create");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         phone: +phone,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.MS_SID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your login token is ${payload}.`,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: "blackgar@naver.com",
    //   to: "blackgar@naver.com",
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
    // console.log(email);
  }
  return res.json({
    ok: true,
  });
  // res.json({ ok: true });
}

// 위의 if문과 같은 역할을 하는 것이 함수 안에 "POST"처럼 method를 지정해주면 된다.
export default withHandler("POST", handler);
