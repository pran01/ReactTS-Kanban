type columProps = {
  status: string;
};

const Columns = ({ status }: columProps) => {
  return (
    <section className="w-64 h-80 bg-fgclr-light rounded-md mt-8 font-inter font-bold px-4">
      <header className="w-full h-12 flex items-center justify-between px-2">
        {status}
        <button>
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </header>
      <hr className="w-full border border-white" />
    </section>
  );
};

export default Columns;
