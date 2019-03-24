document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */'./math').then(({default: fuc}) => {
    fuc();
  })
})



