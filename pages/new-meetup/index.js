// our-domain.com/new-meetUp

import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

// Accepting the data from child to parent here we create function , and pass this onAddMeetup to newMeetUpform.js in components folder. form Submission .

function newMeetUpPage() {

  const router = useRouter();
  async function addMeetUpHandler(enteredmeetUpData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredmeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUpHandler} />
    </>
  );
}
export default newMeetUpPage;