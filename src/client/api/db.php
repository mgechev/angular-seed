<?php 
	class Db {
		protected static $connection;

		public function connect() {

			if(!isset(self::$connection)) {

				$config = parse_ini_file(__DIR__ . '/../../config.ini', true); 
				self::$connection = new mysqli($config['database']['host'],$config['database']['user'],$config['database']['password'],$config['database']['db']);
			}

			if(self::$connection === false) {
				return false;
			}

			return self::$connection;
		}

		/**
		* Query the database
		*
		* @param $query The query string
		* @return mixed The result of the mysqli::query() function
		*/
		public function query($query) {
			$connection = $this -> connect();

			$result = $connection -> query($query);

			return $result;
		}

		/**
		* Fetch rows from the database (SELECT query)
		*
		* @param $query The query string
		* @return bool False on failure / array Database rows on success
		*/
		public function select($query) {
			$rows = array();
			$result = $this -> query($query);
			if($result === false) {
				return false;
			}
			while ($row = $result -> fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}

		/**
		* Fetch the last error from the database
		* 
		* @return string Database error message
		*/
		public function error() {
			$connection = $this -> connect();
			return $connection -> error;
		}

		/**
		* Quote and escape value for use in a database query
		*
		* @param string $value The value to be quoted and escaped
		* @return string The quoted and escaped string
		*/
		public function quote($value) {
			$connection = $this -> connect();
			return "'" . $connection -> real_escape_string($value) . "'";
		}
	}
?>
