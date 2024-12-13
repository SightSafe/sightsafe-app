{
  pkgs ? import <nixpkgs> {}
}:
pkgs.mkShell {
  name="dev-environment";
  buildInputs = [
    # Python
    pkgs.python311
    pkgs.python311.pkgs.pip
    pkgs.python311.pkgs.setuptools
    pkgs.python311.pkgs.wheel
    pkgs.pipenv

    # Node.js
    pkgs.nodejs-18_x

    # Formatters
    pkgs.python311.pkgs.black
    pkgs.nodePackages.prettier
  ];
  shellHook =
  ''
    # Tells pip to put packages into $PIP_PREFIX instead of the usual locations.
    # See https://pip.pypa.io/en/stable/user_guide/#environment-variables.
    # export PIP_PREFIX=$(pwd)/_build/pip_packages;
    # export PYTHONPATH="$PIP_PREFIX/${pkgs.python3.sitePackages}:$PYTHONPATH";
    # export PATH="$PIP_PREFIX/bin:$PATH";
    export PIPENV_VENV_IN_PROJECT=1;
    unset SOURCE_DATE_EPOCH;

    echo "Python v3.11 + Node.js 18";
    echo "Start developing...";
  '';
}
