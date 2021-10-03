import { withAuth } from "components/Auth";
import Button from "components/Button";
import UpdateMyNameForm from "components/Forms/User/UpdateMyNameForm";
import LoadingSpinner from "components/LoadingSpinner";
import SlideOver from "components/SlideOver";
import { useUser } from "hooks/useUser";
import { NextPage } from "next";
import { useState } from "react";
import { User } from "types/generatedTypes";

const MyProfilePage: NextPage = () => {
  const { user, loading } = useUser();
  if (loading) return <LoadingSpinner />;

  return <Profile user={user} />;
};

const Profile: React.FC<{ user: User }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SlideOver open={open} setOpen={setOpen} title="Muokataan yhteystietosi">
        <UpdateMyNameForm setOpen={setOpen} />
      </SlideOver>
      <div className="mx-4 mt-4">
        <h1 className="text-2xl">Profiili</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Yhteystiedot
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Yhteystiedot kuvaus
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Sukunimi
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.lastName ?? "Ei tiedossa"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Etunimi</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.firstName ?? "Ei tiedossa"}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 overflow-hidden">
                    Sähköpostiosoite
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.email}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Yritys</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.organizations[0]?.name}
                  </dd>
                </div>
              </dl>
              <div className="ml-4">
                <Button variant="success" onClick={() => setOpen(true)}>
                  Muokkaa tietoja
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Toiminnot
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Toiminnot kuvaus
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 overflow-hidden">
                    Poista käyttäjätunnus
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Käyttäjätunnuksen poistaaminen poistaa kaikki tietosi
                    järjestelmästä. Käyttäjätunnuksen poistamista ei voi
                    peruuttaa.
                    <br />
                    <button
                      type="submit"
                      disabled={true}
                      className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 opacity-50 cursor-not-allowed"
                    >
                      Poista käyttäjätunnus
                    </button>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Pyydä käyttäjädata
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Pyytämällä käyttäjädatasi saat muutaman päivän kuluessa
                    sähköpostiisi tiedon kaikesta järjestelmän sinusta
                    keräämästä datasta.
                    <br />
                    <button
                      type="submit"
                      disabled={true}
                      className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 opacity-50 cursor-not-allowed"
                    >
                      Pyydä käyttäjädata
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(MyProfilePage);
