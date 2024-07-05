import { UserParticipants } from "../../Pages";
import l1 from "../../assets/gallery1.jpg";
function ParticipantsCard({
  UserParticipant: {
    full_name,
    phone_number,
    nb_of_People_with,
    Payment_Status,
  },
}) {
  return (
    <div className=" border-b-2  flex mb-4 p-3  gap-8 justify-between flex-wrap align-middle w-[100%] ">
      <div className="flex gap-8 text-center  align-middle ">
        {UserParticipants && (
          <h3 className="align-middle font-bold mt-5">{full_name}</h3>
        )}
      </div>
      <p className="mt-5 flex gap-2 flex-col flex-wrap ">
        {UserParticipants && (
          <p>
            Payment Status:{" "}
            <span className="text-red-500">{Payment_Status}</span>
          </p>
        )}{" "}
        {UserParticipants && <p>Phone: {phone_number}</p>}
        {UserParticipants && (
          <p>
            Number of People with:{" "}
            <span className="font-bold">{nb_of_People_with}</span>
          </p>
        )}
      </p>
    </div>
  );
}

export default ParticipantsCard;
