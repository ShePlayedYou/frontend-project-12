const BuildP404Page = () => (
    <>
      <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid" style={{ maxHeight: '300px' }} src="/imgs/Page404.svg"/>
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
      </div>
    </>
  );

export const Page404 = () => BuildP404Page();
