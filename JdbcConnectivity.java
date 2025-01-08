import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JdbcConnectivity {

    // Database connection details
    private static final String URL = "jdbc:mysql://localhost:3306/your_database_name"; 
    private static final String USER = "user"; 
    private static final String PASSWORD = "123456";

    public static void main(String[] args) {
        JdbcConnectivity jdbcExample = new JdbcConnectivity();

        // Test database connection and CRUD operations
        jdbcExample.connectToDatabase();
        jdbcExample.insertUser("newUser", "newPassword");
        jdbcExample.checkUserCredentials("newUser", "newPassword");
        jdbcExample.updateUserPassword("newUser", "updatedPassword");
        jdbcExample.deleteUser("newUser");
    }

    // Method to establish connection to the MySQL database 
    public void connectToDatabase() {
        try {
            // Load the MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            // Establish a connection
            Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Connection established successfully!");

            // Close the connection after successful connection
            connection.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to insert a new user (Sign-Up)
    public void insertUser(String netid, String password) {
        String insertQuery = "INSERT INTO users (netid, password) VALUES (?, ?)";

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement preparedStatement = connection.prepareStatement(insertQuery)) {

            preparedStatement.setString(1, netid);
            preparedStatement.setString(2, password);

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("User inserted successfully!");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to check user credentials (Login)
    public void checkUserCredentials(String netid, String password) {
        String selectQuery = "SELECT * FROM users WHERE netid = ? AND password = ?";

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement preparedStatement = connection.prepareStatement(selectQuery)) {

            preparedStatement.setString(1, netid);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                System.out.println("Login successful: User found!");
            } else {
                System.out.println("Invalid credentials: User not found.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to update user's password
    public void updateUserPassword(String netid, String newPassword) {
        String updateQuery = "UPDATE users SET password = ? WHERE netid = ?";

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement preparedStatement = connection.prepareStatement(updateQuery)) {

            preparedStatement.setString(1, newPassword);
            preparedStatement.setString(2, netid);

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Password updated successfully!");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Method to delete a user from the database
    public void deleteUser(String netid) {
        String deleteQuery = "DELETE FROM users WHERE netid = ?";

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement preparedStatement = connection.prepareStatement(deleteQuery)) {

            preparedStatement.setString(1, netid);

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("User deleted successfully!");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
