import CreatePageLarge from "../components/CreatePage/CreatePageLarge";
import CreatePageSmall from "../components/CreatePage/CreatePageSmall";
import JoinModal from "../components/JoinModalComponents/JoinModal";

const CreatePage = () => {
  return (
    <>
      <div className="md:hidden">
        <CreatePageSmall />
      </div>
      <div className="hidden md:block">
        <CreatePageLarge />
      </div>
      <JoinModal path="create" />
    </>
  );
};

export default CreatePage;
