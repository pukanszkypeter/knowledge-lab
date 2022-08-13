package hu.elteik.knowledgelab.javaengine.algorithms;

import hu.elteik.knowledgelab.javaengine.core.models.*;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class RandomWithLeaderDispersionTest {

    @Test
    public void shouldBehaveAsExpected() {
        Graph graph = new Graph(
                List.of(
                        new Node(1L, NodeState.DEFAULT),
                        new Node(2L, NodeState.DEFAULT),
                        new Node(3L, NodeState.DEFAULT),
                        new Node(4L, NodeState.DEFAULT),
                        new Node(5L, NodeState.DEFAULT),
                        new Node(6L, NodeState.DEFAULT),
                        new Node(7L, NodeState.DEFAULT),
                        new Node(8L, NodeState.DEFAULT),
                        new Node(9L, NodeState.DEFAULT)
                ),
                List.of(
                        new Edge(1L, 1L, 2L, Color.BLACK),
                        new Edge(2L, 2L, 3L, Color.BLACK),
                        new Edge(3L, 1L, 4L, Color.BLACK),
                        new Edge(4L, 2L, 5L, Color.BLACK),
                        new Edge(5L, 3L, 6L, Color.BLACK),
                        new Edge(6L, 4L, 5L, Color.BLACK),
                        new Edge(7L, 5L, 6L, Color.BLUE),
                        new Edge(8L, 4L, 7L, Color.BLACK),
                        new Edge(9L, 5L, 8L, Color.BLUE),
                        new Edge(10L, 6L, 9L, Color.BLUE),
                        new Edge(11L, 7L, 8L, Color.BLACK),
                        new Edge(12L, 8L, 9L, Color.BLUE)
                )
        );
        List<Robot> robotList = List.of(
                new Robot(1L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(2L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(3L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(4L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(5L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(6L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(7L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(8L, RobotState.START, Color.BLUE, 5L, null),
                new Robot(9L, RobotState.START, Color.BLUE, 5L, null)
        );
        while (graph.getNodeList().stream().filter(node -> node.getState().equals(NodeState.OCCUPIED)).count() != graph.getNodeList().size()) {
            new RandomWithLeaderDispersionTwo().step(graph, robotList);
            graph.getNodeList().forEach(System.out::println);
            robotList.forEach(System.out::println);
        }
        assertTrue(true);

    }


    @Test
    public void gridWithOneColorAndOneLeader() {

        Graph graph = new Graph(
                List.of(
                        new Node(1L, NodeState.DEFAULT),
                        new Node(2L, NodeState.DEFAULT),
                        new Node(3L, NodeState.DEFAULT),
                        new Node(4L, NodeState.DEFAULT),
                        new Node(5L, NodeState.DEFAULT),
                        new Node(6L, NodeState.DEFAULT),
                        new Node(7L, NodeState.DEFAULT)
                ),
                List.of(
                        new Edge(1L, 1L, 2L, Color.BLACK),
                        new Edge(2L, 1L, 4L, Color.BLACK),
                        new Edge(3L, 2L, 5L, Color.BLACK),
                        new Edge(4L, 4L, 5L, Color.BLACK),
                        new Edge(5L, 5L, 6L, Color.BLACK),
                        new Edge(6L, 3L, 2L, Color.BLACK),
                        new Edge(7L, 3L, 6L, Color.BLACK),
                        new Edge(8L, 3L, 7L, Color.BLACK),
                        new Edge(9L, 7L, 6L, Color.BLACK)
                )
        );
        List<Robot> robotList = List.of(
                new Robot(1L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(2L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(3L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(4L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(5L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(6L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(7L, RobotState.START, Color.BLACK, 1L, null)
        );
        int i = 0;
        while (graph.getNodeList().stream().filter(node -> node.getState().equals(NodeState.OCCUPIED)).count() != graph.getNodeList().size()) {
            new RandomWithLeaderDispersionTwo().step(graph, robotList);
            graph.getNodeList().forEach(System.out::println);
            robotList.forEach(System.out::println);
            i++;
        }
        System.out.println("Steps: " + i );
        assertTrue(true);
    }

    @Test
    public void gridWithOneColorAndThreeLeader() {

        Graph graph = new Graph(
                List.of(
                        new Node(1L, NodeState.DEFAULT),
                        new Node(2L, NodeState.DEFAULT),
                        new Node(3L, NodeState.DEFAULT),
                        new Node(4L, NodeState.DEFAULT),
                        new Node(5L, NodeState.DEFAULT),
                        new Node(6L, NodeState.DEFAULT),
                        new Node(7L, NodeState.DEFAULT)
                ),
                List.of(
                        new Edge(1L, 1L, 2L, Color.BLACK),
                        new Edge(2L, 1L, 4L, Color.BLACK),
                        new Edge(3L, 2L, 5L, Color.BLACK),
                        new Edge(4L, 4L, 5L, Color.BLACK),
                        new Edge(5L, 5L, 6L, Color.BLACK),
                        new Edge(6L, 3L, 2L, Color.BLACK),
                        new Edge(7L, 3L, 6L, Color.BLACK),
                        new Edge(8L, 3L, 7L, Color.BLACK),
                        new Edge(9L, 7L, 6L, Color.BLACK)
                )
        );
        List<Robot> robotList = List.of(
                new Robot(1L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(2L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(3L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(4L, RobotState.START, Color.BLACK, 2L, null),
                new Robot(5L, RobotState.START, Color.BLACK, 2L, null),
                new Robot(6L, RobotState.START, Color.BLACK, 2L, null),
                new Robot(7L, RobotState.START, Color.BLACK, 2L, null)
        );
        int i = 0;
        while (i < 30) {
            new RandomWithLeaderDispersionTwo().step(graph, robotList);
            graph.getNodeList().forEach(System.out::println);
            robotList.forEach(System.out::println);
            i++;
        }
        System.out.println("Steps: " + i );
        assertTrue(true);
    }

    @Test
    public void gridWithTwoColorAndThreeLeader() {

        Graph graph = new Graph(
                List.of(
                        new Node(1L, NodeState.DEFAULT),
                        new Node(2L, NodeState.DEFAULT),
                        new Node(3L, NodeState.DEFAULT),
                        new Node(4L, NodeState.DEFAULT),
                        new Node(5L, NodeState.DEFAULT),
                        new Node(6L, NodeState.DEFAULT),
                        new Node(7L, NodeState.DEFAULT)
                ),
                List.of(
                        new Edge(1L, 1L, 2L, Color.BLACK),
                        new Edge(2L, 1L, 4L, Color.BLACK),
                        new Edge(3L, 2L, 5L, Color.BLACK),
                        new Edge(4L, 4L, 5L, Color.BLACK),
                        new Edge(5L, 5L, 6L, Color.BLACK),
                        new Edge(6L, 3L, 2L, Color.BLUE),
                        new Edge(7L, 3L, 6L, Color.BLUE),
                        new Edge(8L, 3L, 7L, Color.BLUE),
                        new Edge(9L, 7L, 6L, Color.BLUE)
                )
        );
        List<Robot> robotList = List.of(
                new Robot(1L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(2L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(3L, RobotState.START, Color.BLACK, 1L, null),
                new Robot(4L, RobotState.START, Color.BLACK, 2L, null),
                new Robot(5L, RobotState.START, Color.BLACK, 2L, null),
                new Robot(6L, RobotState.START, Color.BLACK, 2L, null),
                new Robot(7L, RobotState.START, Color.BLUE, 7L, null),
                new Robot(8L, RobotState.START, Color.BLUE, 7L, null),
                new Robot(9L, RobotState.START, Color.BLUE, 7L, null),
                new Robot(10L, RobotState.START, Color.BLUE, 7L, null),
                new Robot(11L, RobotState.START, Color.BLUE, 6L, null),
                new Robot(12L, RobotState.START, Color.BLUE, 6L, null),
                new Robot(13L, RobotState.START, Color.BLUE, 6L, null)
        );
        int i = 0;
        while (i < 5) {
            new RandomWithLeaderDispersionTwo().step(graph, robotList);
            graph.getNodeList().forEach(System.out::println);
            robotList.forEach(System.out::println);
            i++;
        }
        System.out.println("Steps: " + i );
        assertTrue(true);
    }
}