const BuildPage = (index) => (
  <>
    <h3>Page {index}</h3>
    <div>
      Page {index} content: TEXT {index === 3 ? '404' : ''}
    </div>
  </>
);

export const PageOne = () => BuildPage(1);
export const PageTwo = () => BuildPage(2);
export const Page404 = () => BuildPage(3);