import pytest
import requests
import json
from unittest.mock import MagicMock


@pytest.fixture
def mock_api_request(mocker):
    def _mock_get(url, filename):
        file = open(filename, 'r')
        mock_data = json.load(file)
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = mock_data
        mocker.patch('requests.get', return_value=mock_response)

    return _mock_get