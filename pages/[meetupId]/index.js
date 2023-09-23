import MeetupDetail from "../../components/meetups/MeetUpDetail";
import { MongoClient, ObjectId } from "mongodb";
function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://NextJs:p09wxZ0eUIyWL5RB@cluster0.2chvv80.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // find() will give access to all meetups .  :- here we fetching only id ntg else
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //  fetch data for single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://NextJs:p09wxZ0eUIyWL5RB@cluster0.2chvv80.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetups = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  // console.log(meetupId); we see this console on terminal(developer server)  = >  not on browser caz the code between getStaticProps() run during built time
  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        image: selectedMeetups.image,
        description: selectedMeetups.description,
      },
    },
  };
}
export default MeetupDetails;